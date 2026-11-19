# Deploying with Bastille (FreeBSD jails)

The website is a static Next.js export: `npm run build` writes plain HTML, CSS
and JavaScript to `out/`. The jail therefore only runs nginx and never runs
Node.js.

The build happens **outside** the jail. Next.js stopped publishing its native
compiler for FreeBSD after version 13.2.4, so `next build` is not supported on
FreeBSD. Build on Linux or macOS (your machine or CI) and sync `out/` to the
host.

```
build machine                    FreeBSD host                      jail "brlcadweb"
npm run build -> out/  --rsync-> /usr/local/www/brl-cad-web  --ro-> nginx on port 80
                                 host port 80  ------rdr---------->
```

## Files

| Path | Purpose |
| ---- | ------- |
| `brl-cad/web/Bastillefile` | Bastille template: installs nginx, mounts the site, opens the port |
| `brl-cad/web/usr/local/etc/nginx/nginx.conf` | nginx config copied into the jail |
| `deploy.sh` | Builds the site and syncs `out/` to the host |

## One-time host setup

Run these as root on the FreeBSD host.

1. Install and enable Bastille:

   ```sh
   pkg install bastille rsync
   sysrc bastille_enable=YES
   ```

2. Configure the loopback interface (`bastille0`), the pf firewall and storage:

   ```sh
   bastille setup
   ```

   This writes `/etc/pf.conf` and starts pf, which can drop your SSH session.
   Reconnect and continue. If the host already has a pf configuration, do not
   run this step. Add these lines to your existing `/etc/pf.conf` instead and
   run `bastille setup loopback`:

   ```
   table <jails> persist
   nat on $ext_if from <jails> to any -> ($ext_if:0)
   rdr-anchor "rdr/*"
   anchor "bastille/*"
   ```

3. Bootstrap a release. Use the release the host runs (`freebsd-version`); a
   release newer than the host does not work.

   ```sh
   bastille bootstrap 15.0-RELEASE update
   ```

4. Create the jail with a private address:

   ```sh
   bastille create brlcadweb 15.0-RELEASE 10.17.89.10
   ```

5. Create the site directory and let the user you deploy as write to it
   (replace `deploy` with that user):

   ```sh
   mkdir -p /usr/local/www/brl-cad-web
   chown deploy:deploy /usr/local/www/brl-cad-web
   ```

6. Install the template. Copy the `brl-cad` directory from this folder to the
   Bastille templates directory on the host, for example from your machine:

   ```sh
   scp -r bastille/brl-cad root@freebsd-host:/usr/local/bastille/templates/
   ```

7. Apply the template:

   ```sh
   bastille template brlcadweb brl-cad/web
   ```

   To use another host port or site directory:

   ```sh
   bastille template brlcadweb brl-cad/web --arg HOST_PORT=8080 --arg SITE_DIR=/data/brl-cad-web
   ```

## Deploying the site

From the repository root on the build machine:

```sh
bastille/deploy.sh deploy@freebsd-host
```

The script runs `npm ci`, `npm run build` and `rsync --delete` into
`/usr/local/www/brl-cad-web` on the host. The jail sees that directory
read-only, so nginx serves the new files without a restart.

## Checking and maintaining the jail

```sh
bastille list                          # jail state and address
bastille rdr brlcadweb list            # active port redirects
bastille cmd brlcadweb nginx -t        # validate the nginx config
bastille service brlcadweb nginx reload
bastille pkg brlcadweb upgrade         # update nginx
curl -I http://freebsd-host/           # from another machine
```

Apply the template once per jail. A second run refreshes the nginx config and
then stops at the `RDR` line, because the redirect already exists. Run
`bastille rdr brlcadweb clear` first if you need a clean re-apply.

## Not included

- **HTTPS.** nginx listens on plain HTTP port 80. Terminate TLS on a reverse
  proxy in front of the jail, or add a certificate and a 443 listener to
  `nginx.conf` plus `RDR tcp 443 443` to the template.
- **Building in the jail.** See the note at the top.

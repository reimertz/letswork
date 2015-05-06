letswork / letsfun
=====

letswork / letsfun is a tool that will help you be more effective
by giving you the ability to block all those sites that consumes
all your time (facebook, 9gag, reddit, twitter..).

It's all done by adding/removing some magic lines to your
hosts file.

**Caution:** I strongly suggest that you backup your hosts file
```bash
sudo cp -npRv "/etc/hosts" "/etc/hosts_letswork_backup_$(date +"%m_%d_%Y")"
```

##Installation
```bash
sudo npm install -g letswork 
```
*need root privileges since it's editing /etc/hosts

##Usage
```bash
letswork --help
Usage:   letswork              -- block all
         letswork <whitelist>  -- to allow certain homepages for work-related tasks ;)
         letswork --list --l   -- shows list of blockable homepages
         letswork --help --h   -- shows this help

Usage:   letsfun              -- unblock all
         letsfun <blacklist>  -- keep some blocked
         letsfun -h --h       -- shows this help

where  <whitelist||blacklist> is one of:
  9gag,facebook,reddit,twitter

Example: letswork twitter      -- keeps twitter unblocked
         letsfun facebook   -- keeps facebook blocked
```

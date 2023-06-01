# Include in a web blog or article

Phoenix can be included inline in an article or blog using `<iframe>`. For instance, several ATLAS Physics briefings have included Phoenix event displays e.g. https://atlas.cern/Updates/Briefing/Semi-Visible-Jets.

This can be done by using the `Create sharable link` option and filling in the correct paths in the UI
 * Please note that all files need to be accessible by the server (see below for instructions on how to achieve this)
 * You can check [available URL options](https://github.com/HSF/phoenix/blob/master/guides/users.md#url-options) for applying possible options through the URL.
 * One ATLAS-specific change (that you will currently need to add `&theme=dark` to the URL manually to use ) is that you can force a dark theme (normally this follows the browser settings):
  * e.g. `https://phoenixatlas.web.cern.ch/PhoenixATLAS/?file=data/Briefings/SVJT.xml&theme=dark&type=jivexml&config=data/Briefings/run299184_evt439826223.json`

<img width="551" alt="Screenshot 2023-06-01 at 09 07 32" src="https://github.com/ATLAS-experiment/PhoenixATLAS/assets/6764617/34ef3232-f337-4bed-adb8-fb1789cbdcdb">

Scrolling down in the above windows you will see a matching QR code for use embedding in a poster etc. For the example above, you can scan the following QR on your phone or tablet and it will open the event. If you have a device which supports AR, you can even display the event 'in the real world' (unfortunately Safari on iOS does not allow this at the time of writing. See [here](https://github.com/HSF/phoenix/blob/main/guides/users.md#arvr-mode) for details).

<img width="205" alt="Screenshot 2023-06-01 at 09 08 56" src="https://github.com/ATLAS-experiment/PhoenixATLAS/assets/6764617/bb5709be-53b8-4542-a72b-a747d754ad2a">

# Copying the event data and config file to the server

In order to access event and configuration files in this manner, you need to first copy them to the server. To do this you can open a JIRA ticket on https://its.cern.ch/jira/projects/ATLDISPLAY, or, if you will be doing this regularly, please contact edward.moyse@cern.ch to ask for permissions. 

## Adding permissions
For those with write access to the EOS directory (e.g. the phoenix service account, and people already granted access), this can be done by e.g.
```
eos attr set  user.acl="g:1307:rx,u:6968:rwxmc,u:57793:rwxmc,u:99928:rwx,u:126535:rwx,u:58351:rwxmc,u:1203:rwxmc" /eos/atlas/atlascerngroupdisk/proj-phoenixatlas/www/data/Briefings
```

import csv
import urllib2, base64
import json
import sys
import datetime
import argparse
reload(sys)
sys.setdefaultencoding('utf8')

ap = argparse.ArgumentParser()
ap.add_argument("-c", "--collection", required=True,
	help="collection alias")
ap.add_argument("-u", "--username", required=True,
	help="CONTENTdm username")
ap.add_argument("-p", "--password", required=True,
	help="password for CONTENTdm collection")
args = vars(ap.parse_args())

collection = args["collection"]

username = args["username"]
password = args["password"]

url = 'https://collections.carli.illinois.edu:8443/cgi-bin/admin/getfile.exe?CISOMODE=1&CISOFILE=/%s/index/description/export.txt' % collection

request = urllib2.Request(url)
base64string = base64.b64encode('%s:%s' % (username, password))
request.add_header("Authorization", "Basic %s" % base64string)
result = urllib2.urlopen(request)
reader = csv.DictReader(result, delimiter="\t")
data = []

#these rows will be deleted from final JSON file
del_rows = ["CONTENTdm file name","Date created","Date modified","OCLC number","Provenance","CONTENTdm file path","Reference URL"]

for row in reader:
  if "o2" not in row["Title"]:
    for d in del_rows:
      del row[d]
    data.append(row)
item = "var DATA={items: " + json.dumps(data) + "}"
with open('data.js','w') as outfile:
  outfile.write(item)
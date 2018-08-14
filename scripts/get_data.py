import csv
import urllib2, base64
import json
import sys
import datetime
import time
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

def loadremotejson(url):
	response = urllib2.urlopen(url)
	data = json.load(response)
	return data

def GetImages(pointer):
  collection = args["collection"]
  img_pointers = []
  url = 'https://collections.carli.illinois.edu:8443/dmwebservices/index.php?q=dmGetCompoundObjectInfo/%s/%s/json' % (collection, pointer)
  print "Getting image at %s" % url
  try:
    response = loadremotejson(url)
  except SocketError as e:
    if e.errno != errno.ECONNRESET:
      raise
    pass
  if 'type' in response:
    if response['type'] == 'Monograph':
      node = response['node']
      nodes = node['node']
      for n in nodes:
        pages = n['page']
        if isinstance(pages, list):
          for p in pages:
            img_pointers.append(p['pageptr'])
        else:
          img_pointers.append(pages['pageptr'])
    elif response['page'] and isinstance(response['page'], list):
      for p in response['page']:
        img_pointers.append(p['pageptr'])
    else:
      img_pointers.append(response['page']['pageptr'])
    return img_pointers
  else:
    return ['[no images]']


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
    row["img_ptr"] = int(row['CONTENTdm number']) - 2
    for d in del_rows:
      del row[d]
    data.append(row)
item = "var DATA={items: " + json.dumps(data) + "}"
with open('data.js','w') as outfile:
  outfile.write(item)
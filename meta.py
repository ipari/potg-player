# -*- coding: utf-8 -*-

import simplejson as json
import os

meta = []
vod_path = unicode(os.path.join(os.getcwd(), 'POTG'))
for filename in os.listdir(vod_path):
    if filename.endswith(".avi") or filename.endswith(".mp4"):
        raw_info = filename.split('.')[0].split('_')
        info = {}
        info['filename'] = filename
        info['date'] = raw_info[0]
        info['player'] = raw_info[1]
        info['character'] = raw_info[2]
        info['map'] = raw_info[3]
        info['turn'] = raw_info[4]
        meta.append(info)

with open('meta.json', 'w') as f:
    json.dump(meta, f, indent=4)

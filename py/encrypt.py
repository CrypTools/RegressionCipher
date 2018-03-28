#
#
# Use: encrypt("test") or encrypt("test", 50)
#
#
import numpy as np
import json
import base64
def encrypt(text, deg=50):
	l = len(text)
	x = np.arange(l)
	y = []
	for i in range(l):
		y.append(ord(text[i]))
	c = np.polyfit(x, y, deg).tolist()
	JSON = json.dumps(c, separators=(',',':'))
	return base64.b64encode(JSON.encode('ascii'))

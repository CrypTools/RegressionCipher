#
#
# Use: decrypt(encrypt("test"), 4)
#
#
import numpy as np
import json
import base64
def decrypt(out, length):
  v = base64.b64decode(out)
  f = np.poly1d(json.loads(v))
  out = ""
  for i in range(length):
    n = round(f(i))
    out += chr(int(n))
  return out

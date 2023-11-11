```bash
docker run -d \
    -p 2017:2017 \
    -p 20170-20172:20170-20172 \
    -p 12345:12345 \
    --restart=always \
    --privileged \
    -v v2raya_shared-data:/etc/v2ray \
    --name v2raya_backend \
    mzz2017/v2raya

curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer xxx"
```

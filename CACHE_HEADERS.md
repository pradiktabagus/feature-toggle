# CloudFront Cache Headers Guide

## Cache Status Headers

### Custom Headers (Added by API)
```
X-Cache-Source: S3-Cache | Database
X-Cache-Status: HIT | MISS
```

### CloudFront Headers (Automatic)
```
X-Cache: Hit from cloudfront | Miss from cloudfront
X-Amz-Cf-Pop: SIN52-C1 (Edge location)
X-Amz-Cf-Id: Request ID
```

## Testing Cache Status

### Check Headers with curl
```bash
# Full headers
curl -I https://d338emydppt3j.cloudfront.net/public/toggles/your-key.json

# Specific cache headers
curl -s -D - https://d338emydppt3j.cloudfront.net/public/toggles/your-key.json | grep -i cache
```

### Expected Response Headers

#### First Request (Cache MISS)
```
HTTP/1.1 200 OK
X-Cache: Miss from cloudfront
X-Cache-Source: Database
X-Cache-Status: MISS
X-Amz-Cf-Pop: SIN52-C1
Cache-Control: public, max-age=300, s-maxage=3600
```

#### Subsequent Requests (Cache HIT)
```
HTTP/1.1 200 OK
X-Cache: Hit from cloudfront
X-Cache-Source: S3-Cache
X-Cache-Status: HIT
X-Amz-Cf-Pop: SIN52-C1
Age: 45
```

## Cache Status Meanings

### `X-Cache-Source`
- **Database**: Fresh from database, will be cached
- **S3-Cache**: Served from S3 cached file

### `X-Cache` (CloudFront)
- **Hit from cloudfront**: Served from CloudFront edge cache
- **Miss from cloudfront**: Not in edge cache, fetched from origin

### `Age` Header
- Shows how long the response has been cached (seconds)
- Only present on cache hits

## Performance Indicators

### Fast Response (Cache Hit)
- `X-Cache: Hit from cloudfront`
- `Age: >0`
- Response time: <100ms

### Slow Response (Cache Miss)
- `X-Cache: Miss from cloudfront`
- No `Age` header
- Response time: >500ms (database query)
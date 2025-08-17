# CloudFront Configuration Fix

## 502 Error - Origin Configuration Issue

### Required CloudFront Settings:

#### 1. Origin Settings
```
Origin Domain: feature-toggle-files.s3.ap-southeast-1.amazonaws.com
Origin Path: (leave empty)
Origin Access: Origin Access Control (OAC) - RECOMMENDED
```

#### 2. S3 Bucket Policy (Required for OAC)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::feature-toggle-files/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::091154425577:distribution/E18PZOVM8J99OL"
        }
      }
    }
  ]
}
```

#### 3. Default Cache Behavior
```
Path Pattern: *
Origin: feature-toggle-files.s3.ap-southeast-1.amazonaws.com
Viewer Protocol Policy: Redirect HTTP to HTTPS
Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
Cache Policy: CachingOptimized
Origin Request Policy: CORS-S3Origin
```

#### 4. Additional Cache Behavior (for API paths)
```
Path Pattern: public/toggles/*
TTL Settings:
  - Default TTL: 300 (5 minutes)
  - Maximum TTL: 3600 (1 hour)
```

### Quick Fix Steps:

1. **AWS Console → CloudFront → Distribution E18PZOVM8J99OL**
2. **Origins tab → Edit origin**
3. **Set Origin Domain**: `feature-toggle-files.s3.ap-southeast-1.amazonaws.com`
4. **S3 Bucket → Permissions → Bucket Policy** → Add policy above
5. **Wait 5-10 minutes for deployment**

### Test After Fix:
```bash
# Should return file content, not 502
curl https://d338emydppt3j.cloudfront.net/public/toggles/test.json
```
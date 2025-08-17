# CloudFront Origin Fix - Change from Vercel to S3

## Current Issue:
- Origin: `feature-toggle-one.vercel.app-mefcf3jv1gl` ❌
- Should be: `feature-toggle-files.s3.ap-southeast-1.amazonaws.com` ✅

## Fix Steps:

### 1. AWS CloudFront Console
1. Go to CloudFront → Distribution `E18PZOVM8J99OL`
2. Origins tab → Select origin → Edit
3. **Change Origin Domain to**: `feature-toggle-files.s3.ap-southeast-1.amazonaws.com`
4. **Origin Access**: Origin Access Control (create new OAC)
5. Save changes

### 2. S3 Bucket Policy
Add this policy to S3 bucket `feature-toggle-files`:
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

### 3. Wait for Deployment
- CloudFront deployment: ~5-15 minutes
- Status will show "Deployed" when ready

## Why This Matters:
- **Current**: CloudFront → Vercel → Database (slow, no caching benefit)
- **Fixed**: CloudFront → S3 files (fast, true CDN caching)

## Test After Fix:
```bash
# Should serve cached JSON from S3
curl https://d338emydppt3j.cloudfront.net/public/toggles/your-toggle-key.json
```
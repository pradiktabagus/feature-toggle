# AWS Setup untuk CloudFront Caching

## 1. IAM Policy Setup

Attach policy ini ke AWS user yang digunakan:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::feature-toggle-files/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::091154425577:distribution/E18PZOVM8J99OL"
    }
  ]
}
```

## 2. Cara Apply Policy

### Via AWS Console:
1. Buka AWS IAM Console
2. Pilih Users → pilih user yang digunakan
3. Klik "Add permissions" → "Attach policies directly"
4. Klik "Create policy" → JSON tab
5. Paste policy di atas
6. Save dengan nama: `FeatureToggleCloudFrontPolicy`
7. Attach ke user

### Via AWS CLI:
```bash
# Save policy ke file
cat > cloudfront-policy.json << 'EOF'
{policy content}
EOF

# Create policy
aws iam create-policy \
  --policy-name FeatureToggleCloudFrontPolicy \
  --policy-document file://cloudfront-policy.json

# Attach ke user
aws iam attach-user-policy \
  --user-name YOUR_USERNAME \
  --policy-arn arn:aws:iam::091154425577:policy/FeatureToggleCloudFrontPolicy
```

## 3. Test Permission

Setelah apply policy, test dengan:
```bash
bun dev
# Lalu coba create/update toggle via UI
```

CloudFront invalidation akan berjalan otomatis setiap CRUD operation.
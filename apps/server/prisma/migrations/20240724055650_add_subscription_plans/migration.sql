INSERT INTO "subscription_plans" (id, name, amount, "currencyCode", status, "updatedAt")

VALUES
  (gen_random_uuid(), 'Basic Plan', 10, 'USD', 'INACTIVE', NOW()),
  (gen_random_uuid(), 'Pro Plan', 50, 'USD', 'INACTIVE', NOW()),
  (gen_random_uuid(), 'Enterprise Plan', 100, 'USD', 'INACTIVE', NOW());
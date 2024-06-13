#!/bin/bash

# Navigate to the root directory of the project
cd "$(dirname "$0")/../../../../../"

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Navigate back to the script directory
cd "$(dirname "$0")"

# Output the loaded environment variables
echo "Loaded environment variables:"
echo "OKTA_ORG_URL: $OKTA_ORG_URL"
echo "OKTA_CLIENT_ID: $OKTA_CLIENT_ID"
echo "OKTA_CLIENT_SECRET: $OKTA_CLIENT_SECRET"
echo "OKTA_API_TOKEN: $OKTA_API_TOKEN"
echo "OKTA_AUDIENCE: $OKTA_AUDIENCE"

# Fetch access token using client credentials
response=$(curl --request POST \
  --url "$OKTA_ORG_URL/oauth/token" \
  --header 'content-type: application/json' \
  --data "{\"client_id\":\"$OKTA_CLIENT_ID\",\"client_secret\":\"$OKTA_CLIENT_SECRET\",\"audience\":\"$OKTA_AUDIENCE\",\"grant_type\":\"client_credentials\"}")

# Extract access token from response
ACCESS_TOKEN=$(echo $response | jq -r '.access_token')

# Check if access token was obtained successfully
if [ "$ACCESS_TOKEN" != "null" ]; then
  echo "Access token obtained successfully."

  cd airbox/iac/dev/okta

  # Initialize Terraform with environment variables
  export TF_VAR_auth0_domain=$OKTA_ORG_URL
  export TF_VAR_auth0_client_id=$OKTA_CLIENT_ID
  export TF_VAR_auth0_client_secret=$OKTA_CLIENT_SECRET

  # Initialize Terraform
  terraform init

  # Fetch application IDs and output the response
  app_response=$(curl -s -X GET "$OKTA_ORG_URL/api/v2/clients" -H "Authorization: Bearer $ACCESS_TOKEN")
  echo "Response from fetching application IDs: $app_response"

  # Create and import each application into Terraform
  for app_id in $(echo $app_response | jq -r '.[].client_id'); do
    resource_name="example_app_$app_id"
    if ! terraform state show "auth0_client.$resource_name" &>/dev/null; then
      cat <<EOF > "import_app_$app_id.tf"
resource "auth0_client" "$resource_name" {
  name = "Imported Client $app_id"
}
EOF
      terraform import "auth0_client.$resource_name" "$app_id"
    else
      echo "Resource auth0_client.$resource_name is already managed by Terraform."
    fi
  done

  # Fetch user IDs and output the response
  user_response=$(curl -s -X GET "$OKTA_ORG_URL/api/v2/users" -H "Authorization: Bearer $ACCESS_TOKEN")
  echo "Response from fetching user IDs: $user_response"

  if [ "$(echo $user_response | jq -r '. | length')" -gt 0 ]; then
    # Create and import each user into Terraform
    for user_id in $(echo $user_response | jq -r '.[].user_id'); do
      resource_name="example_user_$user_id"
      if ! terraform state show "auth0_user.$resource_name" &>/dev/null; then
        cat <<EOF > "import_user_$user_id.tf"
resource "auth0_user" "$resource_name" {
  email           = "imported_user_$user_id@example.com"
  connection_name = "YOUR_CONNECTION_NAME"  # Replace with your actual connection name
}
EOF
        terraform import "auth0_user.$resource_name" "$user_id"
      else
        echo "Resource auth0_user.$resource_name is already managed by Terraform."
      fi
    done
  else
    echo "No users found to import."
  fi

  # Apply the imported resources
  terraform apply -auto-approve

else
  echo "Failed to obtain access token."
  echo "Response: $response"
fi

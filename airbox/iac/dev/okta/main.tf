# Placeholder for Auth0 Clients
resource "auth0_client" "example_app" {
  for_each = {}
  name     = each.value.name
}

# Placeholder for Auth0 Users
resource "auth0_user" "example_user" {
  for_each = {}
  email           = each.value.email
  connection_name = each.value.connection_name
}

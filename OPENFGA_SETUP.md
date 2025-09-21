# OpenFGA Setup Guide

## Prerequisites

1. **Install OpenFGA Server**

   ```bash
   # Using Docker
   docker run -p 8080:8080 -p 8081:8081 openfga/openfga run
   ```

2. **Create Store and Authorization Model**

   ```bash
   # Create a store
   curl -X POST http://localhost:8080/stores \
     -H "Content-Type: application/json" \
     -d '{"name": "todo-store"}'

   # Create authorization model
   curl -X POST http://localhost:8080/stores/{store-id}/authorization-models \
     -H "Content-Type: application/json" \
     -d '{
       "type_definitions": [
         {
           "type": "todo",
           "relations": {
             "owner": {
               "this": {}
             }
           }
         }
       ]
     }'
   ```

## Environment Variables

Add these to your `.env` file:

```env
# OpenFGA Configuration
OPENFGA_API_SCHEME=http
OPENFGA_API_HOST=localhost:8080
OPENFGA_STORE_ID=your-store-id-here
OPENFGA_AUTHORIZATION_MODEL_ID=your-authorization-model-id-here
```

## Authorization Model

The system uses this authorization model:

```json
{
  "type_definitions": [
    {
      "type": "todo",
      "relations": {
        "owner": {
          "this": {}
        }
      }
    }
  ]
}
```

## How It Works

1. **Create Todo**: Creates tuple `user:userId -> owner -> todo:todoId`
2. **Get All Todos**: Lists all todos where user has `owner` relation
3. **Get Todo**: Checks if user has `owner` relation to specific todo
4. **Update Todo**: Checks `owner` relation before allowing update
5. **Delete Todo**: Checks `owner` relation and removes tuple

## Testing

Use the test script to verify OpenFGA integration:

```bash
node test-todo-api.js
```

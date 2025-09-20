// Test script for Todo API endpoints
// Run this after starting your server with: node test-todo-api.js

const BASE_URL = "http://localhost:3001";

async function testTodoAPI() {
  let authToken = "";

  try {
    console.log("🚀 Testing Todo API...\n");

    // 1. Register a user
    console.log("1. Registering user...");
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      }),
    });

    const registerData = await registerResponse.json();
    if (registerData.success) {
      authToken = registerData.data.token;
      console.log("✅ User registered successfully");
      console.log("Token:", authToken.substring(0, 20) + "...\n");
    } else {
      console.log("❌ Registration failed:", registerData.message);
      return;
    }

    // 2. Create a todo
    console.log("2. Creating a todo...");
    const createResponse = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title: "Learn Node.js",
        description: "Complete the Node.js tutorial and build a REST API",
        priority: "high",
      }),
    });

    const createData = await createResponse.json();
    if (createData.success) {
      console.log("✅ Todo created successfully");
      console.log("Todo ID:", createData.data._id);
      console.log("Title:", createData.data.title);
      console.log("Description:", createData.data.description);
      console.log("Priority:", createData.data.priority);
      console.log("Completed:", createData.data.completed);
      console.log("Created By:", createData.data.createdBy);
      console.log("");
    } else {
      console.log("❌ Todo creation failed:", createData.message);
      return;
    }

    // 3. Get all todos
    console.log("3. Getting all todos...");
    const getAllResponse = await fetch(`${BASE_URL}/api/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const getAllData = await getAllResponse.json();
    if (getAllData.success) {
      console.log("✅ Retrieved all todos");
      console.log("Total todos:", getAllData.data.length);
      console.log("");
    } else {
      console.log("❌ Failed to get todos:", getAllData.message);
    }

    // 4. Create another todo
    console.log("4. Creating another todo...");
    const createResponse2 = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title: "Buy groceries",
        description: "Get milk, bread, and eggs from the store",
        priority: "medium",
      }),
    });

    const createData2 = await createResponse2.json();
    if (createData2.success) {
      console.log("✅ Second todo created successfully");
      const todoId = createData2.data._id;
      console.log("Todo ID:", todoId);
      console.log("");

      // 5. Get specific todo
      console.log("5. Getting specific todo...");
      const getOneResponse = await fetch(`${BASE_URL}/api/todos/${todoId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const getOneData = await getOneResponse.json();
      if (getOneData.success) {
        console.log("✅ Retrieved specific todo");
        console.log("Title:", getOneData.data.title);
        console.log("Description:", getOneData.data.description);
        console.log("");
      } else {
        console.log("❌ Failed to get specific todo:", getOneData.message);
      }

      // 6. Update todo
      console.log("6. Updating todo...");
      const updateResponse = await fetch(`${BASE_URL}/api/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: "Buy groceries (Updated)",
          description: "Get milk, bread, eggs, and fruits from the store",
          completed: true,
          priority: "high",
        }),
      });

      const updateData = await updateResponse.json();
      if (updateData.success) {
        console.log("✅ Todo updated successfully");
        console.log("Updated Title:", updateData.data.title);
        console.log("Updated Description:", updateData.data.description);
        console.log("Completed:", updateData.data.completed);
        console.log("Priority:", updateData.data.priority);
        console.log("");
      } else {
        console.log("❌ Failed to update todo:", updateData.message);
      }

      // 7. Delete todo
      console.log("7. Deleting todo...");
      const deleteResponse = await fetch(`${BASE_URL}/api/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const deleteData = await deleteResponse.json();
      if (deleteData.success) {
        console.log("✅ Todo deleted successfully");
        console.log("");
      } else {
        console.log("❌ Failed to delete todo:", deleteData.message);
      }
    }

    // 8. Final check - get all todos
    console.log("8. Final check - getting all remaining todos...");
    const finalResponse = await fetch(`${BASE_URL}/api/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const finalData = await finalResponse.json();
    if (finalData.success) {
      console.log("✅ Final todos retrieved");
      console.log("Remaining todos:", finalData.data.length);
      console.log("");
    }

    console.log("🎉 All tests completed successfully!");
  } catch (error) {
    console.error("❌ Test failed with error:", error.message);
  }
}

// Run the test
testTodoAPI();

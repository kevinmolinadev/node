import request from "supertest";
import { testServer } from "../../../../test-server";
import { prisma } from "../../../../../src/data/postgres";
describe("todos.route.ts", () => {
    beforeAll(() => {
        testServer.start();
    })

    afterAll(() => {
        testServer.close();
    })

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    })

    const todosTest = [{ title: "test message 1" }, { title: "test message 2" }];

    test("should return array of todos: GET /api/v1/todos", async () => {
        await prisma.todo.createMany({
            data: todosTest
        })

        const { body: { todos } } = await request(testServer.getService).get("/api/v1/todos").expect(200);

        expect(todos).toBeInstanceOf(Array);
        expect(todos.length).toBe(2);
        expect(todos[0].title).toBe(todosTest[0].title);
        expect(todos[1].title).toBe(todosTest[1].title);
    });

    test("should return a todo: GET /api/v1/todos/:id", async () => {
        const todo = await prisma.todo.create({
            data: todosTest[0]
        })
        const { body } = await request(testServer.getService).get(`/api/v1/todos/${todo.id}`).expect(200);

        expect(body).toEqual({
            ...todo,
            createdAt: todo.createdAt.toISOString(),
            updatedAt: todo.updatedAt.toISOString()
        });
    });

    test("should return an error with a non-existent id: GET /api/v1/todos/:id", async () => {
        const id = 1;
        const { body } = await request(testServer.getService)
            .get(`/api/v1/todos/${id}`)
            .expect(404);

        expect(body).toEqual({
            error: `todo with id ${id} not found.`,
        });
    });
    
    test("should return an error if id not a number: GET /api/v1/todos/:id", async () => {
        const id = "1k";
        const { body } = await request(testServer.getService)
            .get(`/api/v1/todos/${id}`)
            .expect(400);

        expect(body).toEqual({
            error: `The id is not a number.`,
        });
    });

    test("should a create todo: POST /api/v1/todos", async () => {
        const { body } = await request(testServer.getService)
            .post("/api/v1/todos")
            .send(todosTest[0])
            .expect(201);

        expect(body).toEqual(expect.objectContaining({
            title: todosTest[0].title
        }))
    });

    test("should return a error if title not is present: POST /api/v1/todos", async () => {
        const { body } = await request(testServer.getService)
            .post("/api/v1/todos")
            .send({})
            .expect(400);

        expect(body).toEqual({
            error: "Title property is requiered."
        });
    });

    test("should return a error if title is empty: POST /api/v1/todos", async () => {
        const { body } = await request(testServer.getService)
            .post("/api/v1/todos")
            .send({ title: "" })
            .expect(400);

        expect(body).toEqual({
            error: "The title can't a empty."
        });
    });

    test("should update a todo: PUT /api/v1/todos", async () => {
        const todo = await prisma.todo.create({
            data: todosTest[0]
        })

        const updateData = {
            title: "test update",
            status: "completed",
            completedAt: "2024-01-08"
        }
        const { body } = await request(testServer.getService)
            .put(`/api/v1/todos/${todo.id}`)
            .send(updateData)
            .expect(200);

        expect(body).toEqual(expect.objectContaining({
            ...updateData,
            completedAt: new Date(updateData.completedAt).toISOString()
        }))

    });

    test("should return a error if title is empty: PUT /api/v1/todos", async () => {
        const todo = await prisma.todo.create({
            data: todosTest[0]
        })

        const { body } = await request(testServer.getService)
            .put(`/api/v1/todos/${todo.id}`)
            .send({ title: "" })
            .expect(400);

        expect(body).toEqual({
            error: "The title can't a empty."
        })
    });

    test("should return a error if status is invalid type: PUT /api/v1/todos", async () => {
        const todo = await prisma.todo.create({
            data: todosTest[0]
        })

        const status = "MEGA-COMP";

        const { body } = await request(testServer.getService)
            .put(`/api/v1/todos/${todo.id}`)
            .send({ status })
            .expect(400);

        expect(body).toEqual({
            error: `The status ${status} is not a type valid.`
        })
    });

    test("should return a error if completedAt is a invalid date: PUT /api/v1/todos", async () => {
        const todo = await prisma.todo.create({
            data: todosTest[0]
        })

        const { body } = await request(testServer.getService)
            .put(`/api/v1/todos/${todo.id}`)
            .send({ completedAt: "hello" })
            .expect(400);

        expect(body).toEqual({
            error: "CompletedAt is not a valid date."
        })
    });

    test("should return an error if id not a number: PUT /api/v1/todos/:id", async () => {
        const id = "1k";
        const { body } = await request(testServer.getService)
            .put(`/api/v1/todos/${id}`)
            .expect(400);

        expect(body).toEqual({
            error: `The id is not a number.`,
        });
    });

    test("should return a todo deleted: DELETE /api/v1/todos/:id", async () => {
        const todo = await prisma.todo.create({
            data: todosTest[0]
        })
        const { body } = await request(testServer.getService)
            .delete(`/api/v1/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            ...todo,
            createdAt: todo.createdAt.toISOString(),
            updatedAt: todo.updatedAt.toISOString()
        });
    });

    test("should return an error if id not a number: DELETE /api/v1/todos/:id", async () => {
        const id = "1k";
        const { body } = await request(testServer.getService)
            .delete(`/api/v1/todos/${id}`)
            .expect(400);

        expect(body).toEqual({
            error: `The id is not a number.`,
        });
    });
})
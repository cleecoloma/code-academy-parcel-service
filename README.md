# Code Academy Parcel Service

**Phase 1: Event Driven Applications** 
> Begin the build of an application for a product called CAPS - The Code Academy Parcel Service. In this sprint, we’ll build out a system that emulates a real world supply chain. CAPS will simulate a delivery service where vendors (such a flower shops) will ship products using our delivery service and when our drivers deliver them, each vendor will be notified that their customers received what they purchased. This will be an event driven application that “distributes” the responsibility for logging to separate modules, using only events to trigger logging based on activity.

## Installation

> Start with: `npm install`

> Set your PORT environment with an .env file

```text
PORT=3001
DATABASE_URL={SQL_database_link}
SECRET={Secret_code_for_bcrypt}
```

## Usage

Auth route requests:
```text
method: POST
route: /api/auth/signup
route: /api/auth/signin
```

Unauthenticated route request:
```text
method: GET, POST, PUT, DELETE
modelL: food or clothes
route: /api/v1/:model/:id
```

Authenticated route request:
```text
method: GET, POST, PUT, DELETE
modelL: food or clothes
route: /api/v2/:model/:id
```

## UML Diagram
![Bearer Auth UML Diagram](./public/images/401-class-08-lab.png)

## PR link
[PR link Class 08](https://github.com/cleecoloma/auth-api/pull/1)
[PR link Class 08](https://github.com/cleecoloma/auth-api/pull/2)

## Contributors
> Chester Lee Coloma
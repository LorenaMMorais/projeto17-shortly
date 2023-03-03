CREATE TABLE users(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createdAt" DATE DEFAULT NOW()
);

CREATE TABLE urls(
    "id" SERIAL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "createdAt" DATE DEFAULT NOW(),
);

CREATE TABLE sessions(
    "id" SERIAL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" INTEGER REFERENCES users("id")
)

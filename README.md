# Node.js File and Date Server

This is a modular Node.js application that provides several endpoints:

- **Greeting Page**: A personalized greeting message with the current date and time.
- **File Operations**: Reading from and writing to a file using URL query parameters.
- **Routing**: Modular routing to handle different endpoints for serving date, time, and file content.

The app is built with scalability, modularity, and clean code principles in mind.

## Features

1. **Personalized Greeting with Date and Time**:  
   - The home page (`/`) displays a greeting along with the current date and time.
   - The greeting can be personalized by providing a `name` query parameter in the URL.

2. **File Operations**:  
   - Append content to a file via URL parameters.
   - Read the file content and display it on the browser.

3. **Error Handling**:  
   - Proper error handling for missing or incorrect query parameters.
   - Error codes and messages are returned for invalid requests.

## Table of Contents

- [Node.js File and Date Server](#nodejs-file-and-date-server)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps to Install:](#steps-to-install)
  - [Usage](#usage)
    - [1. Greeting and Date](#1-greeting-and-date)
      - [Example:](#example)
      - [Default Example:](#default-example)
    - [2. Writing to a File](#2-writing-to-a-file)
      - [Example:](#example-1)
    - [3. Reading from a File](#3-reading-from-a-file)
      - [Example:](#example-2)
  - [Project Structure](#project-structure)
  - [Error Handling](#error-handling)
  - [Attributions](#attributions)

## Installation

### Prerequisites

- Node.js (version 12.x or later)
- Git (optional, for cloning the repository)

### Steps to Install:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ebodshojaei/server_js.git
   cd server_js
   ```

2. **Install dependencies**:  
   This application has no external dependencies besides Node.js.
   ```bash
   npm install
   ```

3. **Run the server**:  
   The server runs on port `7431` by default.
   ```bash
   node server.js
   ```

4. **Access the application**:  
   Open a web browser and visit `http://localhost:7431` to interact with the app.

## Usage

### 1. Greeting and Date

When you visit the root URL (`/`), a greeting with the current date and time will be displayed. You can customize the greeting by providing a `name` query parameter.

#### Example:

```bash
http://localhost:7431/?name=John
```
- If you don't provide the `name` query, the app defaults to `Ebaad`.

#### Default Example:

```bash
http://localhost:7431/
```
- Displays: "Hello, Ebaad! What a beautiful day. Server current date and time is ..."

### 2. Writing to a File

You can append text to a file using the `/file/write` route. The text is provided as a query parameter in the URL.

#### Example:

```bash
http://localhost:7431/file/write/?text=HelloWorld
```
- This appends "HelloWorld" to `file.txt`.

### 3. Reading from a File

You can read the contents of the file using the `/file/read` route. If the file exists, its content will be displayed; otherwise, a 404 error will be returned.

#### Example:

```bash
http://localhost:7431/file/read
```
- Returns the content of `file.txt`.

## Project Structure

```
.
├── _modules
│   ├── date.js             # Module to get the current date and time
│   └── file.js             # Module for file operations (reading and writing)
├── _tests
│   └── file.test.js        # Test file for file operations
├── data                    # Directory where file.txt is stored
├── lang
│   └── en
│       └── user.js         # Greeting message template
├── routes
│   ├── date
│   │   └── index.js        # Handles date and greeting requests
│   └── file
│       ├── index.js        # Main file routing
│       ├── read.js         # Handles file read requests
│       └── write.js        # Handles file write requests
├── .gitignore              # Git ignore file
├── lab3_criteria.pdf        # Lab 3 instructions
├── README.md               # This file
├── server.js               # Main server script
└── routes/handler.js        # Centralized route handler
```

## Error Handling

1. **Invalid Name Query**:  
   - If the `name` query parameter is missing or invalid, a `400 Bad Request` error is returned.
   - Name length should be between 2 to 50 characters and contain only letters.

2. **File Not Found**:  
   - If a user attempts to read a file that doesn't exist, a `404 Not Found` error is returned.

3. **Method Not Allowed**:  
   - Only `GET` requests are allowed for date and greeting endpoints. Any other request type will return a `405 Method Not Allowed` error.

## Attributions

Documentation/code was reviewed/formatted by the developer and AI software (OpenAI).**

** Updated as of Oct. 2, 2024 23:27 PST by @ebodshojaei

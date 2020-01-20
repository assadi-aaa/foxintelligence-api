## Description
The program consume an actively written-to w3c-formatted HTTP access log and analyse it.
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash

Set path of the log file in the environments files

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```
## Things I've done
- Build the Api to analyse log file with Nestjs framework (typescript)
- Add config files for different environments
- Use Rxjs to handle events
- Use system storage to persist treated data
- Use a job to keep realtime reading the file log
- Read the file from where we ended reading last time
- Add documentation using Swagger on that url : http://localhost:3000/doc/
- Add cache system to cache response to increase performance 
- Add unit and e2e tests

## Things I wish I could have done
- I have tried for fun to test with on big file (2gb) , the Api was too slow so that leaded me to think of other ways to deal with this   problem like split the file and parallelize the treatment
- Exploit all the data in the log file and do some advanced statistics
- Add a login to secure the Api
- Use a database to keep processed data  
- Push tests further to cover more code
- Follow a TDD approach
- add log system 

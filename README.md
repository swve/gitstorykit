<p align="center"><br>
  <a href="https://framestack.net">
    <img src=".github/img/gitstorykit.png" height="128">
  </a>
</p>
<center>
<p align="center">
  
 <img alt="GitHub" src="https://img.shields.io/github/license/swve/gitstorykit">
 <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/swve/gitstorykit">
 <img alt="GitHub issues" src="https://img.shields.io/github/issues/swve/gitstorykit">
</p>
</center>



GitStoryKit is a little development kit that can be used to develop apps and software that enables git time travel, the library is in early development and is designed for simplicity 

GitHub is the only Git client supported but support for these clients is on the works : 
- Gitlab 
- BitBucket 

## Usage 

### Initialization 

```js
import GitStory from "gitstorykit";

const gitstory = new GitStory("Github");

gitstory.init({ owner: "vercel", repo: "next.js", sha: "5.0" }); 
```

### Get first commit
```js
const commit = await gitstory.getFirstCommit();
```

### Get first commit Date
```js
const commit = await gitstory.getFirstCommitDate();
```

### Get commit Date
Dates should be in the *ISO 8601 format*
```js
const commit = await gitstory.getCommitDate(commit_sha);
```

### Get commit between dates

Dates should be in the *ISO 8601 format*
```js
const commit = await gitstory.getCommitsBetweenDates(startDate, endDate, per_page: number, page: number);
```

### Get commits until date

Dates should be in the *ISO 8601 format*
```js
const commit = await gitstory.getCommitsUntilDate(date, per_page: number, page: number);
```

### Get years active
```js
const commit = await gitstory.yearsActive();
```



## Contributing

Please see our [contributing.md](/CONTRIBUTING.md).

## Authors

Badr B. ([@swve](https://github.com/swve))

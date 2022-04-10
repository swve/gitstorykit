import GitStory from "../index";

const gitstory = new GitStory("Github");
gitstory.init({ owner: "swve", repo: "framestack" });

const start = "2019-01-11T00:00:00.000Z";
const end = "2019-01-13T00:00:00.000Z";
const test3 = "2018-01-13T00:00:00.000Z";

async function testCommitUntilDate() {
  const test = await gitstory.getCommitsUntilDate(test3, 200, 1);
  test.data.forEach((element) => {
    console.log(element.commit.author.date);
  });
}

async function testCommitBetween() {
  const test = await gitstory.getCommitsBetweenDates(start, end, 200, 1);
  test.data.forEach((element) => {
    console.log(element.commit.author.date);
  });
}

async function testGetCommitDate() {
  const test = await gitstory.getCommitDate("22d1771c29912369c0a8c38fmb8964392a59da631");
  console.log(test);
}

async function yearsActive() {
  const test = await gitstory.yearsActive();
  console.log(test);
}

async function getFirstCommit() {
  const test = await gitstory.getFirstCommit();
  console.log(test);
}

(async function () {
  //testCommitUntilDate();
  //yearsActive();
  //getFirstCommit();
  //testGetCommitDate();
  //testCommitBetween();
  // → 🎉
})();

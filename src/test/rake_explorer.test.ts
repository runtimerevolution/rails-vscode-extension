import * as assert from "assert";
import { getRakeTasks } from "../activity_bar";

suite("Rake Task Explorer", function() {
  test("getRakeTasks", function(done) {
    getRakeTasks()
      .then(rakeTasks => {
        let firstTask = rakeTasks[0];
        assert.deepEqual(
          {
            name: "about",
            description:
              "List versions of all Rails frameworks and the environment"
          },
          firstTask
        );
      })
      .then(done, done);
  });
});

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert";
import { parseRoutes } from "../activity_bar";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function() {
  // Defines a Mocha unit test
  test("parseRoutes", function() {
    [
      {
        input: `                   Prefix Verb URI Pattern                                                                              Controller#Action
    rails_service_blob GET  /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
rails_blob_representation GET  /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
    rails_disk_service GET  /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
update_rails_disk_service PUT  /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
  rails_direct_uploads POST /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create`,
        output: [
          {
            prefix: "rails_service_blob",
            verb: "GET",
            uri: "/rails/active_storage/blobs/:signed_id/*filename(.:format)",
            action: "active_storage/blobs#show"
          },
          {
            prefix: "rails_blob_representation",
            verb: "GET",
            uri:
              "/rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format)",
            action: "active_storage/representations#show"
          },
          {
            prefix: "rails_disk_service",
            verb: "GET",
            uri: "/rails/active_storage/disk/:encoded_key/*filename(.:format)",
            action: "active_storage/disk#show"
          },
          {
            prefix: "update_rails_disk_service",
            verb: "PUT",
            uri: "/rails/active_storage/disk/:encoded_token(.:format)",
            action: "active_storage/disk#update"
          },
          {
            prefix: "rails_direct_uploads",
            verb: "POST",
            uri: "/rails/active_storage/direct_uploads(.:format)",
            action: "active_storage/direct_uploads#create"
          }
        ]
      },
      {
        input: `                   Prefix Verb   URI Pattern                                                                              Controller#Action
      offers GET    /offers(.:format)                                                                        offers#index
             POST   /offers(.:format)                                                                        offers#create
       offer GET    /offers/:id(.:format)                                                                    offers#show
             PATCH  /offers/:id(.:format)                                                                    offers#update
             PUT    /offers/:id(.:format)                                                                    offers#update
             DELETE /offers/:id(.:format)                                                                    offers#destroy`,
        output: [
          {
            prefix: "offers",
            verb: "GET",
            uri: "/offers(.:format)",
            action: "offers#index"
          },
          {
            prefix: "offers",
            verb: "POST",
            uri: "/offers(.:format)",
            action: "offers#create"
          },
          {
            prefix: "offer",
            verb: "GET",
            uri: "/offers/:id(.:format)",
            action: "offers#show"
          },
          {
            prefix: "offer",
            verb: "PATCH",
            uri: "/offers/:id(.:format)",
            action: "offers#update"
          },
          {
            prefix: "offer",
            verb: "PUT",
            uri: "/offers/:id(.:format)",
            action: "offers#update"
          },
          {
            prefix: "offer",
            verb: "DELETE",
            uri: "/offers/:id(.:format)",
            action: "offers#destroy"
          }
        ]
      }
    ].forEach(({ input, output }) => {
      let actual = parseRoutes(input);
      assert.deepEqual(output, actual);
    });
  });
});

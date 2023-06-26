import { MongoClient } from 'mongodb'


declare namespace JSX {
    import { PassageElement, PassageProfileElement } from '@passageidentity/passage-elements'
    interface IntrinsicElements {
        "passage-auth": PassageElement;
        "passage-login": PassageElement;
        "passage-register": PassageElement;
        "passage-profile": PassageProfileElement;
    }
}




declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

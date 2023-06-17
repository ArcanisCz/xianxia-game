// import { Fragment } from 'react';
import { withRootStore } from './gameProvider';
import css from './app.module.css';
// import { ActivityKeys } from './game/activities';
// import { ActivityTagKeys } from './game/activityTags';

export const App = withRootStore(({ game }) => {
  // const changeLocation = () => {
  //   if (game.currentLocation.id === 'graveyard') {
  //     game.changeLocation('sect');
  //   } else {
  //     game.changeLocation('graveyard');
  //   }
  // };
  //
  // const changeActivity = (time: ActivityTagKeys, activity: ActivityKeys) => {
  //   game.changeActivity(time, activity);
  // };

  return (
    <div className={css.pokus}>
      Console
      {/*{game.parallelActivityTags.map(tagId => {*/}
      {/*  const tag = game.activityTagsRegistry[tagId];*/}

      {/*  return (*/}
      {/*    <Fragment key={tagId}>*/}
      {/*      <div>*/}
      {/*        {tag.name}: {game.activeActivity[tagId].name}*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        {game.availableActivitiesByTag(tagId).map(activity => (*/}
      {/*          <button*/}
      {/*            key={activity.id}*/}
      {/*            disabled={activity.id === game.activeActivity[tagId].id}*/}
      {/*            onClick={() => changeActivity(tagId, activity.id)}*/}
      {/*          >*/}
      {/*            {activity.name}*/}
      {/*          </button>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </Fragment>*/}
      {/*  );*/}
      {/*})}*/}
      {/*<hr />*/}
      {/*<div>Loc: {game.currentLocation.name}</div>*/}
      {/*<hr />*/}
      {/*<button onClick={changeLocation}>Change Location</button>*/}
    </div>
  );
});

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import styles from './Styles';



const Static = props => {
  const {classes} = props;
  return(
    <div className={classes.root}>
      <GridList cellHeight={260} className={classes.gridList} cols={3}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

Static.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Static);

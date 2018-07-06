const styles = {
  card: {
    minWidth: 275,
    margin:5,
  },
  container1: {
    display: 'flex',
    flexDirection: 'column',
  },
  container2: {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    padding:18,
    paddingBottom:6,
  },
  title: {
    marginBottom: 8,
    fontSize: 20,
    paddingTop:0,
    flexBasis: '70%',
    marginRight: 'auto'
  },
  ratingStars: {
    marginBottom: 8,
    flexBasis: '30%',
    textAlign: 'right'
  },
  vicinity: {
    flex: '1 0 90%'
  },
  ratingInteger: {
    flex: '1 0 10%',
    textAlign: 'right'
  },
  buttonRemove:{
    marginLeft:'auto',
    marginRight: -3
  },
  buttonAdd:{
    marginLeft:-4
  }
};

export default styles;

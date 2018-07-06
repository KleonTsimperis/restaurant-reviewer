const styles = theme => ({
  root: {
    width: '100%',
  },
  containerA:{
    display: 'flex',
    borderBottom: '1px solid grey',
  },
  heading1: {
    fontSize: theme.typography.pxToRem(25),
    fontWeight: theme.typography.fontWeightRegular,
    flex: '1 0 92%',
  },
  heading2: {
    flex: '1 0 8%',
    alignSelf: 'center',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  containerB: {
    display: 'flex',
    flexWrap: 'wrap',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  formControlA: {
    margin: theme.spacing.unit,
    minWidth: 60,
    width:60,
    flexBasis: '5%'
  },
  formControlB: {
    flexBasis: '5%',
    marginRight: 'auto'
  },
  formControlC: {
    flexBasis: '5%',
    width: '150px',
    marginRight:'5rem'
  },
  paddingBottom: {
    paddingBottom: '8px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    margin:8
  }
});

export default styles;

import { connect } from "react-redux";
import Settings from './Settings';

const mapStateToProps = state => ({
  user: state.session.user
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

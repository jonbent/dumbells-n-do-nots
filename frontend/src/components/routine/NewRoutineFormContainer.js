import { connect } from 'react-redux';
import NewRoutineForm from './NewRoutineForm';
import { createRoutine } from '../../actions/RoutineActions';
import DateFormat from 'dateformat';


const mapStateToProps = (state) => {
    const currentDate = new Date();
    const weekFromCurrentDate = currentDate.setDate(currentDate.getDate() + 7)
    return { 
        routine: {
            user: state.session.user.id,
            startDate: DateFormat(currentDate, 'yyyy-mm-dd'),
            endDate: DateFormat(weekFromCurrentDate, 'yyyy-mm-dd')
        } 
    }
};

const mapDispatchToProps = dispatch => ({
    createRoutine: routine => dispatch(createRoutine(routine))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewRoutineForm);



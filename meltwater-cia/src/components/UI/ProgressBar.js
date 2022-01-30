import { Box, Typography, withStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: "#EEEEEE",
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const ProgressBar = (props) => {
    return (
        <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <BorderLinearProgress variant="determinate" value={props.progress} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${props.progress}%`}</Typography>
            </Box>
        </Box>
    )
}
export default ProgressBar;

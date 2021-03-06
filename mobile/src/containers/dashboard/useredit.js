import React from 'react';
import { connect } from 'react-redux';
import { withStyles,  } from 'material-ui/styles';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import DraftsIcon from 'material-ui-icons/Drafts';
import PhoneIcon from 'material-ui-icons/Phone';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import SaveIcon from 'material-ui-icons/Save';

import { api, json } from '../../api';
import sampleImage from '../../assets/images/sample.jpg';


const styleSheet = theme=>({
	
  imageContainer: {
		position: 'relative'
	},
	image: {
		width: '100%',
		height: '100%',
	},
	name: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		color: 'white'
	},
	role: {
		position: 'absolute',
		bottom: 5,
		left: 20,
		color: 'white'
	},
	root: {
    width: '100%',
	},
	saveButton: {
		position: 'fixed',
		bottom: 20,
		right: 20
	}
});

class UserEdit extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			profile: {

			}
		}
		this.onSaveProfile = this.onSaveProfile.bind(this);
	}
	
	componentDidMount() {
		this.setState({profile: this.props.user});
	}

	componentWillReceiveProps() {
	}

	onSaveProfile() {
		api.post('/profile', json({profile: this.state.profile}))
		.then((res) => {
			if (res.ok) {
				this.props.onRequestClose();
				if (this.props.user.id === res.data.profile.id)
					this.props.dispatch({type: "SET_USER", payload: res.data.profile});
			}
		})
	}

	render () {
		const classes = this.props.classes;
		
		return (
			<Dialog
				open={this.props.open}
				onRequestClose={this.props.onRequestClose}
				transition={<Slide direction="up" />}
				>
				{/* <DialogContent> */}
					<div className={classes.imageContainer}>
						<img src={sampleImage} className={classes.image}/> 
						<Typography type="headline" className={classes.name}>
							{this.state.profile.name}
						</Typography>
						<Typography className={classes.role}>
							{this.state.profile.role}
						</Typography>
					</div>
						
					<List className={classes.root}>
						<ListItem>
							<ListItemIcon><AccountCircleIcon/></ListItemIcon>
							<TextField
								label="Name"
								value={this.state.profile.name}
								className={classes.textField}
								defaultValue="Full Name"
								fullWidth
								onChange={event => this.setState({profile: {...this.state.profile, name: event.target.value}})}
							/>
						</ListItem>
						<ListItem>
							<ListItemIcon><DraftsIcon /></ListItemIcon>
							<TextField
								label="Email"
								value={this.state.profile.email}
								className={classes.textField}
								defaultValue="Email"
								fullWidth
								onChange={event => this.setState({profile: {...this.state.profile, email: event.target.value}})}
							/>
						</ListItem>
						
						<ListItem>
							<ListItemIcon><PhoneIcon /></ListItemIcon>
							<TextField
								label="Phone Number"
								value={this.state.profile.phone}
								className={classes.textField}
								defaultValue="Phone Number"
								fullWidth
								disabled
								onChange={event => this.setState({profile: {...this.state.profile, phone: event.target.value}})}
							/>
						</ListItem>
						<ListItem>
							<div>
								<RadioGroup
									aria-label="Gender"
									name="gender"
									selectedValue={this.state.profile.gender}
									onChange={(event, value) => this.setState({profile: {...this.state.profile, gender: value}})}
									row>
										<FormControlLabel value="male" control={<Radio />} label="Male" />
										<FormControlLabel value="female" control={<Radio />} label="Female" />
										<FormControlLabel value="other" control={<Radio />} label="Other" />
								</RadioGroup> 
							</div>
							<div>
								<RadioGroup
									aria-label="Role"
									name="role"
									selectedValue={this.state.profile.role}
									onChange={(event, value) => this.setState({profile: {...this.state.profile, role: value}})}
									row>
										<FormControlLabel value="admin" control={<Radio />} label="Admin" />
										<FormControlLabel value="employee" control={<Radio />} label="Employee" />
										<FormControlLabel value="client" control={<Radio />} label="Client" />
								</RadioGroup>
							</div>
						</ListItem>
					</List>
				<DialogActions>
          <Button onClick={() => this.props.onRequestClose()} color="accent">
            Cancel
          </Button>
					<Button onClick={() => this.onSaveProfile()} color="primary">
            Save
          </Button>
        </DialogActions>
			</Dialog> 
		);
	}
}


export default connect()(withStyles(styleSheet)(UserEdit));
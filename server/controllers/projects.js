require("dotenv").config();

// import all the mongoose models
const User = require("../models/user");
const Project = require("../models/project");

exports.create_project = async (req, res) => {
  const { name, target_goal, deadline, description, creatorId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the project." });
  }
  if (!target_goal) {
    errors.push({ msg: "Please provide a target_goal for the project." });
  }
  if (!deadline) {
    errors.push({ msg: "Please provide a deadline for the project." });
  }
  // Check if user is logged in
  if (!creatorId) {
    errors.push({ msg: "Unauthorized user, please log in." });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      // Note: Are duplicate project names ok? (tella)
      // const project = await Project.findOne({ name });
      // if (project) throw Error("Project name already taken.");

      const newProject = new Project({
        name,
        target_goal,
        deadline,
        description,
        creator: creatorId,
        amount_donated: 0,
        donors: [],
      });
      const savedProject = await newProject.save();
      if (!savedProject) throw Error("Failed to create the project.");

      // update the owner of the project to add the newly created project to their list of projects
      const creator = await User.findById(creatorId);
      creator.projectsOwned = [...creator.projectsOwned, savedProject];
      const updatedCreator = await creator.save();
      if (!updatedCreator) throw Error("Failed to failed to update the user.");

      res.status(200).json({
        id: savedProject._id.toString(),
        name,
        description,
        target_goal,
        amount_donated: 0,
        creator,
        donors: [],
        created: savedProject.created,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

/*
// retrieve projects list
exports.get_all_projects = async (req, res) => {
  console.log("retrieving projects list");

  try {
    const user = await User.findById(req.params.id).select("projects");
    if (!user) throw Error("User does not exist.");

    res.status(200).json(user.projects);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

exports.get_project = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  console.log("retrieving a specific project");
  try {
    // use ID search for public projects
    const project = await Project.findById(req.params.id);
    if (!project) throw Error("Unable to find project.");

    // check the members of the project and check if user is a member
    // let isMember = false;
    // for (let member of project.members) {
    //   if (member.user._id == userId) {
    //     isMember = true;
    //   }
    // }
    // console.log(userId);
    // console.log(`isMember is ${isMember}`);
    // if (isMember)
    res.status(200).json(project);
    // else throw Error("User is not a member of this project.");
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

exports.get_dm_project = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  console.log("retrieving a specific project");
  try {
    // use ID search for public projects
    const project = await Project.findOne({ name: req.params.projectName });
    if (!project) throw Error("Unable to find project.");

    res.status(200).json(project);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};



// note: take into account what to do if the project requires a password to join
exports.join_project = async (req, res) => {
  const { name, userId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the project." });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(userId).populate("projects");
      if (!user) throw Error("Unable to find user with that ID.");

      // check if user is already in that project
      for (let project of user.projects) {
        if (project.name === name)
          throw Error("Already a member of this project.");
      }

      const project = await Project.findOne({ name });
      if (!project) throw Error("Unable to find project with that name.");

      // check if the project requires a password to join
      if (project.password) {
        // request the next part of the form which asks for a password
        res.status(200).json({
          password_required: true,
          projectId: project._id,
          name: project.name,
        });
      }
      // continue and add the project to the list of the projects of the user,
      // and add the user as a member of the project
      else {
        // just update the project's members
        project.members = [
          ...project.members,
          { user: userId, roles: ["member"] },
        ];
        await project.save();
        // update the user's project list'
        user.projects = [...user.projects, project];
        await user.save();

        res.status(200).json({
          project,
          // user: { projects: user.projects },
        });
      }
      l;
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.submit_project_password = async (req, res) => {
  const { password, projectId, userId } = req.body;

  let errors = [];

  // check if any of the following fields are empty
  if (!password) {
    errors.push({ msg: "Please provide the project's password." });
  }
  if (!userId) {
    errors.push({ msg: "Unauthorized user. Please log in." });
  }
  if (!projectId) {
    errors.push({ msg: "No project ID provided." });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(userId).populate("projects");
      if (!user) throw Error("Unable to find user with that ID.");

      // check if user is already in that project
      for (let project of user.projects) {
        if (project._id == projectId)
          throw Error("Already a member of this project.");
      }

      const project = await Project.findById(projectId);
      if (!project) throw Error("Unable to find project with that ID.");

      // check if the password is correct, throw an error if not
      const isMatch = await bcrypt.compare(password, project.password);
      if (!isMatch) throw Error("Password is incorrect.");

      // just update the project's members
      project.members = [
        ...project.members,
        { user: userId, roles: ["member"] },
      ];
      await project.save();
      // update the user's project list'
      user.projects = [...user.projects, project];
      await user.save();

      res.status(200).json({
        project,
        // user: { projects: user.projects },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.leave_project = async (req, res) => {
  const { projectId, userId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!projectId) {
    errors.push({ msg: "Please provide an ID for the project." });
  }
  if (!userId) {
    errors.push({ msg: "Unauthorized user." });
  }
  // if there areerrors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(userId).populate("projects");
      if (!user) throw Error("Unable to find user with that ID.");

      // note: should use ID
      const project = await Project.findById(projectId).populate("members");
      if (!project) throw Error("Unable to find that project.");

      // just update the project's members
      project.members = project.members.filter(
        (member) => member.user._id !== userId
      );
      console.log(project.members);
      await project.save();
      // update the user's project list'
      user.projects = user.projects.filter((userProject) => {
        // using == because one is an object and the other is a string, to allow conversion between data types
        // so it works as intended
        return userProject._id != projectId;
      });
      await user.save();

      res.status(200).json({
        projects: user.projects,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.update_project_name = async (req, res) => {
  const { name, projectId, userId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the project." });
  }
  if (!projectId) {
    errors.push({ msg: "Please provide an ID for the project." });
  }
  if (!userId) {
    errors.push({
      msg: "Please provide an ID for the user making the request.",
    });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      let authorized = false;
      // get the project using projectId
      const project = await Project.findById(projectId).populate(
        "members.user"
      );
      if (!project) throw Error("Unable to find that project.");
      //  allow action if the user is the owner
      if (project.owner == userId) authorized = true;
      // check the members of the project and check if user is authorized to perform the action (admin)
      for (let member of project.members) {
        if (member.user._id == userId) {
          for (let role of member.roles) {
            // allow the user to update the name if they are an admin
            if (role === "admin") authorized = true;
          }
        }
      }
      if (authorized) {
        project.name = name;
        await project.save();
        res.status(200).json({ projectId, name });
      } else {
        throw Error("Unauthorized action.");
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.upload_icon = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const { userId } = req.body;
    const projectId = req.params.id;

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "amussement_setups",
      public_id: `${projectId}-project-icon`,
      width: 350,
      height: 350,
      crop: "limit",
    });

    const iconUrl = uploadedResponse.secure_url;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: {
          image_url: iconUrl,
        },
      },
      {
        new: true,
      }
    );
    if (!updatedProject) throw Error("Failed to update the project.");

    res.status(200).json({
      image_url: iconUrl,
      _id: projectId,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
};

exports.edit_project = async (req, res) => {
  const { name, password, projectId, userId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!name) {
    errors.push({ msg: "Please provide a name for the project." });
  }
  if (!projectId) {
    errors.push({ msg: "Please provide an ID for the project." });
  }
  if (!userId) {
    errors.push({
      msg: "Please provide an ID for the user making the request.",
    });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      let authorized = false;
      // get the project using projectId
      const project = await Project.findById(projectId).populate(
        "members.user"
      );
      if (!project) throw Error("Unable to find that project.");
      //  allow action if the user is the owner
      if (project.owner == userId) authorized = true;
      // check the members of the project and check if user is authorized to perform the action (admin)
      for (let member of project.members) {
        if (member.user._id == userId) {
          for (let role of member.roles) {
            // allow the user to update the name if they are an admin
            if (role === "admin") authorized = true;
          }
        }
      }
      if (authorized) {
        project.name = name;
        // if password was included in the request body
        if (password) {
          // check if salt generation has any errors
          const salt = await bcrypt.genSalt(10);
          if (!salt)
            throw Error("Something went wrong with encrypting the password.");
          // check if hashing the password has any errors
          const hash = await bcrypt.hash(password, salt);
          if (!hash) throw Error("Something went wrong hashing the password.");

          project.password = hash;
        }
        await project.save();
        console.log("294");
        console.log(project);
        res.status(200).json(project);
      } else {
        throw Error("Unauthorized action.");
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.delete_project = async (req, res) => {
  const { projectId, userId } = req.body;
  let errors = [];

  // check if any of the following fields are empty
  if (!projectId) {
    errors.push({ msg: "Please provide an ID for the project." });
  }
  if (!userId) {
    errors.push({ msg: "Unauthorized user." });
  }
  // if there areerrors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const project = await Project.findById(projectId);
      if (!project) throw Error("Unable to find that project.");

      // delete all the messages that belong to this project
      await Message.deleteMany({ project: project.name });
      await project.remove();
      res.status(200).json({ projectId });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};
*/

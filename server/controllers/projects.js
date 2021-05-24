require("dotenv").config();
// import all the mongoose models
const User = require("../models/user");
const Project = require("../models/project");
const { PROJECTS_PER_BATCH } = require("../utils/constants.js");

// retrieve projects list (not user specific)
exports.get_all_projects = async (req, res) => {
  console.log("retrieving all projects");
  try {
    // note: ask teammates if there are any categories for retrieving all projects
    const projects = await Message.find()
      // note: ask teammates how to sort the projects retrieved
      .sort({ createdAt: -1 })
      // note: figure out how to keep track of retrieval count (tella)
      .limit(PROJECTS_PER_BATCH /* * (retrievalCount + 1)*/);
    if (!projects) throw Error("Unable to retrieve projects.");
    res.status(200).json(projects);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

// retrieve all projects that belong only to a specific user
exports.get_all_user_projects = async (req, res) => {
  console.log("retrieving user projects list");

  try {
    const userProjects = {};
    const user = await User.findById(req.params.id).select(
      "projectsOwned projectsSupported"
    );
    if (!user) throw Error("User does not exist.");

    console.log(user);
    const { projectsOwned, projectsSupported } = user;
    // categorize them first for easy retrieval
    userProjects = { projectsOwned, projectsSupported };
    res.status(200).json(userProjects);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

// retrieve a specific project using ID
exports.get_project = async (req, res) => {
  console.log("retrieving a project");
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw Error("Project does not exist.");

    res.status(200).json(project);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

// have a user create a project
exports.create_project = async (req, res) => {
  const { name, target_goal, deadline, description, creatorId } = req.body;
  let errors = [];
  // note: remove this when I am done with it
  throw Error("showing error notification for testing purposes! please remove");
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
        status: "active",
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
        status: "active",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.cancel_project = async (req, res) => {
  const { projectId, userId } = req.body;
  let errors = [];

  if (!userId) {
    errors.push({
      msg: "Unauthorized user, ID not found.",
    });
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      let authorized = false;
      // get the project using projectId
      const project = await Room.findById(projectId);
      if (!project) throw Error("Unable to find that project.");
      // check if the user is the owner of the project
      if (userId == project.creator.toString()) authorized = true;
      // only allow the project to be canceled if user is authorized
      if (authorized) {
        project.status = "canceled";
        // update project status in database
        await project.save();
        res.status(200).json(project);
      } else {
        throw Error("Unauthorized user. Unable to cancel the project.");
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

  // check if any of the following properties are empty
  if (!projectId) {
    errors.push({ msg: "Please provide an ID for the project." });
  }
  if (!userId) {
    errors.push({ msg: "Unauthorized user." });
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      let authorized = false;
      const project = await Project.findById(projectId);
      if (!project) throw Error("Unable to find that project.");
      // check if the user is the owner of the project
      if (userId == project.creator.toString()) authorized = true;
      // only allow the project to be canceled if user is authorized
      if (authorized) {
        // delete it from the database
        await project.remove();
        // return the projectId to use for removing it in the frontend
        res.status(200).json({ projectId });
      } else {
        throw Error("Unauthorized user. Unable to delete the project.");
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

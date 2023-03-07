import { Router } from 'express';
import TeamController from '../controller/team.controller';

const teamRouter = Router();
const teamController = new TeamController();
// function route
teamRouter.get('/', teamController.getAll);
teamRouter.get('/:id', teamController.getSingleTeam);

export default teamRouter;

import * as express from 'express';
import ErrorHandler from './api/middlewares/errorHandler';
import LoginRouter from './api/routes/user.route';
// import LeaderboardRouter from './api/routers/Leaderboard.router';
import MatchRouter from './api/routes/match.route';
import TeamRouter from './api/routes/teams.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.loadRoutes();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private loadRoutes(): void {
    this.app.use('/teams', TeamRouter);
    this.app.use('/login', LoginRouter);
    this.app.use('/matches', MatchRouter);
    // this.app.use('/leaderboard', LeaderboardRouter);

    this.app.use(ErrorHandler.handler);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();

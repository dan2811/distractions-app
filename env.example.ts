//switch the value of currentEnv before building to toggle between variable sets.
type Env = 'dev' | 'stage' | 'tempStage' | 'prod';
const currentEnv: Env = 'dev';

interface EnvVars {
  backendUrl: string;
  distradminUrl: string;
  oneSignalAppId: string;
}

const devVars: EnvVars = {
  backendUrl: 'http://localhost:1337',
  distradminUrl: 'http://localhost:3000',
  oneSignalAppId: '<<ONE_SINGAL_APP_ID>>',
};

const stageVars: EnvVars = {
  backendUrl: 'url',
  distradminUrl: 'url',
  oneSignalAppId: '<<ONE_SINGAL_APP_ID>>',
};

const tempStageVars: EnvVars = {
  backendUrl: 'url',
  distradminUrl: 'url',
  oneSignalAppId: '<<ONE_SINGAL_APP_ID>>',
};

const prodVars: EnvVars = {
  backendUrl: 'url',
  distradminUrl: 'url',
  oneSignalAppId: '<<ONE_SINGAL_APP_ID>>',
};

const getCurrentEnvVars = (current: Env): EnvVars => {
  switch (current) {
    case 'dev':
      return devVars;
    case 'stage':
      return stageVars;
    case 'tempStage':
      return tempStageVars;
    case 'prod':
      return prodVars;
  }
};

export let env: EnvVars = getCurrentEnvVars(currentEnv);

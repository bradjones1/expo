import { Platform } from 'react-native';

import { installationID, isDevice } from '../native-modules/DevLauncherInternal';
import { queryDevSessionsAsync } from '../native-modules/DevMenu';
import { DevSession } from '../types';

// TODO -- move this into context / make it settable via JS
const baseAddress = Platform.select({
  ios: 'http://localhost',
  android: 'http://10.0.2.2',
});

const statusPage = 'status';
const portsToCheck = [8081, 8082, 19000, 19001, 19002, 19003, 19004, 19005];

export async function getDevSessionsAsync(isAuthenticated = false): Promise<DevSession[]> {
  let devSessions: DevSession[] = [];

  if (isAuthenticated) {
    const sessions = await queryDevSessionsAsync();
    devSessions = devSessions.concat(sessions);
  }

  if (!devSessions.length && installationID) {
    const sessions = await queryDevSessionsAsync(installationID);
    devSessions = devSessions.concat(sessions);
  }

  if (!devSessions.length && !isDevice) {
    const localPackagers = await getLocalPackagersAsync();
    devSessions = devSessions.concat(localPackagers);
  }

  return devSessions;
}

export async function getLocalPackagersAsync(): Promise<DevSession[]> {
  const onlineDevSessions: DevSession[] = [];

  await Promise.all(
    portsToCheck.map(async (port) => {
      try {
        const address = `${baseAddress}:${port}`;
        const { status } = await fetch(`${address}/${statusPage}`);
        if (status === 200) {
          onlineDevSessions.push({
            url: address,
            description: address,
            source: 'desktop',
          });
        }
      } catch (e) {}
    })
  );

  return onlineDevSessions;
}

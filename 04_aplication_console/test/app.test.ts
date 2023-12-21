import { ServerApp } from '../src/presentation/server_app';

describe('Test App.ts', () => {
    test('should call Server.run with values', async () => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        
        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-c', '-n', 'test-file', '-d', 'test-destination'];
        await import('../src/app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            create: true,
            name: 'test-file',
            outputDir: 'test-destination'
        });
    });
});
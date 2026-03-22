import TcpSocket from 'react-native-tcp-socket';

export class TcpManager {
  private client: TcpSocket.Socket | null = null;

  public connect(host: string, port: number) {
    this.client = TcpSocket.createConnection({
      port: port,
      host: host,
    }, () => {
      console.log('Connected to TCP server');
    });

    this.client.on('data', (data) => {
      console.log('Received data:', data.toString());
    });

    this.client.on('error', (error) => {
      console.error('TCP error:', error);
    });

    this.client.on('close', () => {
      console.log('TCP connection closed');
    });
  }

  public send(data: string) {
    if (this.client) {
      this.client.write(data);
    }
  }

  public disconnect() {
    if (this.client) {
      this.client.destroy();
      this.client = null;
    }
  }
}

"""
Starts the server to process HTTP requests
NOTE: This file is borrowed from Prof Alan Weide's CPSC 419 Full Stack problem sets
"""

import sys
from argparse import ArgumentParser
from app import app

def main():
    """ Starts up HTTP server on specified port """

    parser = ArgumentParser(allow_abbrev=False,
        description="Serendipity server")
    parser.add_argument('port', type=str,
        help="the port on which the server is listening")
    args = parser.parse_args()

    try:
        port = int(args.port)
    except ValueError:
        print('Port must be an integer.', file=sys.stderr)
        sys.exit(1)

    try:
        assert 0 <= port <= 65536
    except AssertionError:
        print('Port must be between integer values of 0 and 65536.')
        sys.exit(1)

    try:
        app.run(host='localhost', port=port, threaded=True, debug=True)
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()

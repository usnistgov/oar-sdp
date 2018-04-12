# Building and Testing via Docker

This directory contains docker containers and tools for building and
testing the software in this repository.  The docker containers
provide all necessary prerequisites installed in an isolated
environment.  These tools do their work by mounting the source code
directory so that built products are subsequently available on the
docker host (under the `dist` directory).

To build the products, execute the following:

```bash
docker/run.sh -d build
```

Run this if you only intend to build products.  The `-d` option builds
the docker required containers first.

To run the tests, execute the following:
```bash
docker/run.sh -d test
```

Another useful mode is available via the `shell` argument.  This
launches the testing container with an interactive Bash shell.  This
gives the user interactive access to the product environment.  When
used in combination with `build` or `test` it will execute those
commands before starting the shell.  Call `run.sh` with `--help` for
a summary of the available functionality.


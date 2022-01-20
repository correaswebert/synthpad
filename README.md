Synthpad
========

Create beautiful musical pieces with a simple interface!


Installation
------------

```bash
git clone https://github.com/correaswebert/synthpad
cd synthpad
npm install
```


Usage
-----

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080).

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


Building
--------

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`.


License
-------

GNU GPL v2

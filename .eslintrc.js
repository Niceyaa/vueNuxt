modules.exports = {
    'no-unused-vars': [
        'error',
        // we are only using this rule to check for unused arguments since TS
        // catches unused variables but not args.
        {varsIgnorePattern: '.*', args: 'none'}
    ],
}

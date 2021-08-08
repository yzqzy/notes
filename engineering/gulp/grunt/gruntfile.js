module.exports = grunt => {
  grunt.registerTask('bad', () => {
    console.log('bad working~');
    return false;
  });
  grunt.registerTask('foo', () => {
    console.log('foo working~');
  });
  grunt.registerTask('default', ['bad', 'foo']);

  grunt.registerTask('bad-async', function () {
    const done = this.async();

    setTimeout(() => {
      done(false);
    }, 1000);
  });
}
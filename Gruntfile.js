module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		project: {
			name: 'wedding',
			srcPath: 'src',
			distPath: 'dist'
		},

		watch: {
			bower: {
				options: {
					livereload: true
				},
				files: ['<%=project.srcPath%>/**.html', '<%=project.srcPath%>/css/**.css', '<%=project.srcPath%>/js/**.js']
			}
		},
		clean: {
			start: ['<%=project.distPath%>/'],
			end: [
				'<%=project.distPath%>/js/plugins/',
				'<%=project.distPath%>/js/_**',
				'<%=project.distPath%>/js/inline-*.js',
				'<%=project.distPath%>/css/_**',
				'<%=project.distPath%>/css/inline-*.css',
				'<%=project.distPath%>/img/_**',
				'<%=project.distPath%>/img/**/**.psd'
			]
		},
		copy: {
			page: {
				files: [
					{
						expand: true,
						filter: 'isFile',
						cwd: '<%=project.srcPath%>/',
						src: ['*.html', '*.php'],
						dest: '<%=project.distPath%>/'
					}
				]
			},
			css: {
				expand: true,
				cwd: '<%=project.srcPath%>/css/',
				src: '**',
				dest: '<%=project.distPath%>/css/'
			},
			js: {
				expand: true,
				cwd: '<%=project.srcPath%>/js/',
				src: '**',
				dest: '<%=project.distPath%>/js/'
			},
			img: {
				expand: true,
				cwd: '<%=project.srcPath%>/img/',
				src: '**',
				dest: '<%=project.distPath%>/img/'
			},
			album: {
				files: [
					{
						expand: true,
						cwd: '<%=project.srcPath%>/album/',
						src: '**',
						dest: '<%=project.distPath%>/album/'
					}
				]
			},
			php: {
				files: [
					{
						expand: true,
						cwd: '<%=project.srcPath%>/public/',
						src: '**',
						dest: '<%=project.distPath%>/public/'
					}
				]
			},
			wechat: {
				files: [
					{
						expand: true,
						cwd: '<%=project.srcPath%>/wechat-img/',
						src: '**',
						dest: '<%=project.distPath%>/wechat-img/'
					}, {
						expand: true,
						cwd: '<%=project.srcPath%>/wechat-log/',
						src: '**',
						dest: '<%=project.distPath%>/wechat-log/'
					}, {
						expand: true,
						cwd: '<%=project.srcPath%>/wechat-photo/',
						src: '**',
						dest: '<%=project.distPath%>/wechat-photo/'
					}, {
						expand: true,
						cwd: '<%=project.srcPath%>/wechat-php-sdk/',
						src: '**',
						dest: '<%=project.distPath%>/wechat-php-sdk/'
					}
				]
			}
		},
		useminPrepare: {
			html: ['<%=project.distPath%>/*.html', '<%=project.distPath%>/*.php']
		},
		usemin: {
			html: ['<%=project.distPath%>/*.html', '<%=project.distPath%>/*.php']
		},
		inline: {
			dist: {
				options:{
					cssmin: true,
					uglify: true,
					exts: ['php']
				},
				src: ['<%=project.distPath%>/*.html', '<%=project.distPath%>/*.php']
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', [
		'clean:start',
		'copy:page',
		'copy:css',
		'copy:js',
		'copy:img',
		'copy:album',
		'copy:php',
		'copy:wechat',
		'useminPrepare',
		'concat:generated',
		'uglify:generated',
		'usemin',
		'inline:dist',
		'clean:end'
	]);
};
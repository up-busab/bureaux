/*
* If running in Jetty - compile jsx files when they change
* Otherwise just compile them once
*/

String buildDir = ""
String nodeDir = buildDir + "node/node"
String moduleDir = buildDir + "node_modules"

String wpDir = moduleDir + "/webpack/bin/webpack.js"
String wpdevDir = moduleDir + "/webpack-dev-server/bin/webpack-dev-server.js"

boolean isJettyRun = false
List<String> goals = session.getGoals()

for (String s : goals)
    if (s.equals('jetty:run'))
        isJettyRun = true

if (isJettyRun) {
    def proc_webpack = new ProcessBuilder([nodeDir, wpdevDir, "--inline", "--hot", "--stdin", "--port", "9090"])
                                        .inheritIO()
                                        .directory(project.getBasedir())
                                        .start()
} else {
    println "Compiling client code..."

    def webpack = new ProcessBuilder([nodeDir, wpDir, "--display-error-details", "-p", "--progress", "--bail"])
                                   .inheritIO()
                                   .directory(project.getBasedir())

    def env = webpack.environment()
    env.put("WAR_NAME", project.build.finalName)
    def proc_webpack = webpack.start()
    proc_webpack.waitForOrKill(120000)
    if(proc_webpack.exitValue() != 0)
        throw new org.apache.maven.plugin.MojoFailureException("Error compiling clinet code")
}

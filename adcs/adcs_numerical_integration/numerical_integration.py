import numpy as np
from scipy import integrate
import timeit

def eq1(x):
    return 2*x
def eq2(x):
    return np.cos(x)

def eulerIntegration(func, vals, stepSize, initVal):
    y = np.empty_like(vals)
    y[0] = initVal
    for i in range(len(vals)-1):
        y[i+1] = y[i] + stepSize*func(vals[i])

    return y
def rk4(func, vals, stepSize, initVal):
    y = np.empty_like(vals)
    y[0] = initVal
    for i in range(len(vals)-1):
        k1 = stepSize*func(vals[i])
        k2 = stepSize*func(vals[i]+stepSize/2)
        k3 = k2
        k4 = stepSize*func(vals[i]+stepSize)
        y[i+1]= y[i] +(1/6)*(k1+2*k2+2*k3+k4)
    return y
def dopri5Int(func, vals, initVal):
    integrand = integrate.ode(func)
    integrand.set_integrator("dopri5")
    integrand.set_initial_value(initVal)
    y = np.empty_like(vals)
    for i in range(len(vals)):
        y[i] = integrand.integrate(vals[i])
    return y

timeStep = 0.01
maxTime = 300
time = np.arange(0, maxTime, timeStep)
# print(eulerIntegration(eq1,time,timeStep,1))
# print(rk4(eq1, time,timeStep,1))
# print(dopri5Int(eq1, time, 1))


'use strict';

/**
 * AnimationData
 * @class AnimationData
 */
var AnimationData = function() 
{
	if (!(this instanceof AnimationData)) 
	{
		throw new Error(Messages.CONSTRUCT_ERROR);
	}
	
	this.birthTime;
	this.lastTime; // the last update time.***
	this.durationInSeconds;
	
	// start location.***
	this.startLongitude;
	this.startLatitude;
	this.startAltitude;
	
	// target location.***
	this.targetLongitude;
	this.targetLatitude;
	this.targetAltitude;
	
	// target rotation.***
	this.targetHeading;
	this.targetPitch;
	this.targetRoll;
	
	// linear velocity in m/s.***
	this.linearVelocityInMetersSecond;
	
	// angular velocity deg/s.***
	this.headingAngDegSecondVelocity;
	this.pitchAngDegSecondVelocity;
	this.rollAngDegSecondVelocity;
};

/**
 * AnimationManager
 * @class AnimationManager
 */
var AnimationManager = function() 
{
	if (!(this instanceof AnimationManager)) 
	{
		throw new Error(Messages.CONSTRUCT_ERROR);
	}
	
	this.nodesMap;
	
};

/**
 * 어떤 일을 하고 있습니까?
 */
AnimationManager.prototype.putNode = function(node) 
{
	if (this.nodesMap === undefined)
	{ this.nodesMap = {}; }
	
	var nodeId = node.data.nodeId;
	this.nodesMap[nodeId] = node;
};

/**
 * 어떤 일을 하고 있습니까?
 */
AnimationManager.prototype.checkAnimation = function(magoManager) 
{
	if (this.nodesMap === undefined)
	{ return; }
	
	var node;
	for (var key in this.nodesMap)
	{
		if (Object.prototype.hasOwnProperty.call(this.nodesMap, key))
		{
			node = this.nodesMap[key];
			if (node.finishedAnimation(magoManager))
			{
				delete this.nodesMap[key];
			}
		}
	}
};

/**
 * tracked clear.
 */
AnimationManager.prototype.clearTracked = function() 
{
	if (this.nodesMap === undefined)
	{ return; }
	
	var node;
	for (var key in this.nodesMap)
	{
		if (Object.prototype.hasOwnProperty.call(this.nodesMap, key))
		{
			node = this.nodesMap[key];
			if (node.data.animationData)
			{
				node.data.animationData.tracked = undefined;
			}
		}
	}
};

/**
 * start track.
 */
AnimationManager.prototype.startTracked = function(node) 
{
	if (this.nodesMap === undefined || !Object.prototype.hasOwnProperty.call(this.nodesMap, node.data.nodeId))
	{ 
		throw new Error('animation already end.');
	}
	
	if (node.data.animationData)
	{
		this.clearTracked();
		node.data.animationData.tracked = true;
	}
};